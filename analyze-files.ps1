# Script simple para procesar archivos restantes
$basePath = "c:\Proyectos\nui\projects\nui\styles\variables"
$files = @("modal-dialog", "paginator", "panel", "popover", "progress-bar", "slidepanel", "spinner", "switch", "tab", "time-picker", "toast", "tooltip")

foreach ($file in $files) {
    $inputFile = "$basePath\_$file.scss"
    Write-Host "Processing $file..."
    
    if (Test-Path $inputFile) {
        $content = Get-Content $inputFile -Raw
        Write-Host "File exists: $inputFile"
        
        # Verificar si contiene :root
        if ($content -match ':root') {
            Write-Host "Contains :root - needs processing"
        } else {
            Write-Host "No :root found"
        }
    } else {
        Write-Host "File not found: $inputFile"
    }
}

Write-Host "Analysis completed!"