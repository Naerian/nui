# Script para procesar archivos SCSS y separar variables
$basePath = "c:\Proyectos\nui\projects\nui\styles\variables"
$files = @("calendar", "chip", "fab-button", "modal-dialog", "paginator", "panel", "popover", "progress-bar", "slidepanel", "spinner", "switch", "tab", "time-picker", "toast", "tooltip")

foreach ($file in $files) {
    $inputFile = "$basePath\_$file.scss"
    $tokensDir = "$basePath\$file"
    $tokensFile = "$tokensDir\_$file-tokens.scss"
    $variablesFile = "$tokensDir\$file-variables.scss"
    
    if (Test-Path $inputFile) {
        Write-Host "Processing $file..."
        
        # Leer contenido del archivo original
        $content = Get-Content $inputFile -Raw
        
        # Separar SCSS variables (antes de :root) y CSS variables (dentro de :root)
        if ($content -match ':root\s*{') {
            $parts = $content -split ':root\s*{'
            $scssContent = $parts[0]
            $cssContent = $parts[1]
            
            # Remover la llave de cierre
            $cssContent = $cssContent -replace '}[^}]*$', ''
            
            # Crear archivo tokens (SCSS)
            $tokensHeader = @"
// ========================================
// $($file.ToUpper()) - Tokens (SCSS Variables)
// ========================================
//
// Variables SCSS centralizadas para personalizar el componente $($file -replace '-', ' ' | Get-Culture | ForEach-Object {$_.TextInfo.ToTitleCase($_)}).
// Todas las variables usan !default para permitir sobrescritura.
//
// ========================================

"@
            $scssContent = $tokensHeader + $scssContent.TrimEnd()
            Set-Content -Path $tokensFile -Value $scssContent -Encoding UTF8
            
            # Crear archivo variables (CSS con mixin)
            $variablesHeader = @"
// ========================================
// $($file.ToUpper()) - Variables (CSS Custom Properties)
// ========================================
//
// CSS variables para el componente $($file -replace '-', ' ' | Get-Culture | ForEach-Object {$_.TextInfo.ToTitleCase($_)}).
// Se incluyen a través del mixin nui-$file-vars.
//
// Uso:
// ``````scss
// :root {
//   @include nui-$file-vars;
// }
// ``````
//
// ========================================

@mixin nui-$file-vars {
$cssContent
}
"@
            Set-Content -Path $variablesFile -Value $variablesHeader -Encoding UTF8
        }
    }
}