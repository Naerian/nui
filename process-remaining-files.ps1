# Script para procesar los archivos restantes de variables
$basePath = "c:\Proyectos\nui\projects\nui\styles\variables"
$remainingFiles = @(
    "modal-dialog", "paginator", "panel", "popover", "progress-bar", 
    "slidepanel", "spinner", "switch", "tab", "time-picker", "toast", "tooltip"
)

foreach ($file in $remainingFiles) {
    $inputFile = "$basePath\_$file.scss"
    $tokensDir = "$basePath\$file"
    $tokensFile = "$tokensDir\_$file-tokens.scss" 
    $variablesFile = "$tokensDir\$file-variables.scss"
    
    if (Test-Path $inputFile) {
        Write-Host "Processing $file..."
        
        # Leer contenido
        $content = Get-Content $inputFile -Raw
        
        # Buscar :root
        if ($content -match '(?s):root\s*\{(.*?)\}\s*$') {
            $rootContent = $matches[1].Trim()
            $scssContent = ($content -split ':root\s*\{')[0].TrimEnd()
            
            # Crear header para tokens
            $componentTitle = ($file -replace '-', ' ').ToUpper()
            $componentName = $file -replace '-', ' ' | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }
            
            $tokensHeader = @"
// ========================================
// $componentTitle - Tokens (SCSS Variables)
// ========================================
//
// Variables SCSS centralizadas para personalizar el componente $componentName.
// Todas las variables usan !default para permitir sobrescritura.
//
// ========================================

"@
            
            $variablesHeader = @"
// ========================================
// $componentTitle - Variables (CSS Custom Properties)
// ========================================
//
// CSS variables para el componente $componentName.
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
$rootContent
}
"@
            
            # Escribir archivos
            Set-Content -Path $tokensFile -Value ($tokensHeader + $scssContent) -Encoding UTF8
            Set-Content -Path $variablesFile -Value $variablesHeader -Encoding UTF8
            
            Write-Host "✓ Created $file files"
        } else {
            Write-Host "⚠ No :root found in $file"
        }
    } else {
        Write-Host "✗ File not found: $inputFile"
    }
}

Write-Host "Processing completed!"