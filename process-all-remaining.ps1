# Script para procesar los archivos restantes
$basePath = "c:\Proyectos\nui\projects\nui\styles\variables"
$files = @("modal-dialog", "paginator", "panel", "popover", "progress-bar", "slidepanel", "switch", "tab", "time-picker")

foreach ($file in $files) {
    $inputFile = "$basePath\_$file.scss"
    $tokensFile = "$basePath\$file\_$file-tokens.scss"
    $variablesFile = "$basePath\$file\$file-variables.scss"
    
    if (Test-Path $inputFile) {
        Write-Host "Processing $file..."
        
        $content = Get-Content $inputFile -Raw
        
        # Buscar el patrón :root y dividir el contenido
        if ($content -match '(?s)(.*?):root\s*\{(.*?)\}\s*$') {
            $scssContent = $matches[1].TrimEnd()
            $cssContent = $matches[2].Trim()
            
            # Crear nombres para headers
            $componentTitle = $file.ToUpper() -replace '-', ' '
            $componentName = (Get-Culture).TextInfo.ToTitleCase($file -replace '-', ' ')
            
            # Crear archivo tokens
            $tokensContent = @"
// ========================================
// $componentTitle - Tokens (SCSS Variables)
// ========================================
//
// Variables SCSS centralizadas para personalizar el componente $componentName.
// Todas las variables usan !default para permitir sobrescritura.
//
// ========================================

$scssContent
"@
            
            # Crear archivo variables
            $variablesContent = @"
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
$cssContent
}
"@
            
            Set-Content -Path $tokensFile -Value $tokensContent -Encoding UTF8
            Set-Content -Path $variablesFile -Value $variablesContent -Encoding UTF8
            
            Write-Host "✓ Created files for $file"
        } else {
            Write-Host "⚠ No :root pattern found in $file"
        }
    } else {
        Write-Host "✗ File not found: $inputFile"
    }
}

Write-Host "All files processed!"