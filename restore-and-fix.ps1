# Restore file from git
Push-Location 'c:\Proyectos\nui'
git checkout HEAD -- 'projects/nui/src/lib/components/calendar/calendar.component.ts'
Pop-Location

# Wait a moment for file to be restored
Start-Sleep -Milliseconds 500

# Read the file
$filePath = 'c:\Proyectos\nui\projects\nui\src\lib\components\calendar\calendar.component.ts'
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Check if it's restored
if ($content.Length -lt 1500) {
    Write-Host "ERROR: File is still corrupted or too small. Length: $($content.Length)"
    exit 1
}

# Find the ngAfterViewInit section
$pattern = @"
  ngAfterViewInit\(\): void \{
    // Si se abri.+ desde un overlay \(datepicker\), hacer focus en el d.+a seleccionado/actual
    if \(this\.isOpenedByOverlay\(\)\) \{
      this\.focusInitialDay\(\);
    \}

    // Observar cambios en los botones de d.+a para hacer focus cuando cambian
    effect\(\(\) => \{
      this\.dayButtons\(\);
      const focusedIndex = this\.focusedDayIndex\(\);
      if \(focusedIndex >= 0\) \{
        untracked\(\(\) => this\.focusDayButton\(focusedIndex\)\);
      \}
    \}\);

    // Observar cambios en los botones de mes para hacer focus cuando cambian
    effect\(\(\) => \{
      this\.monthButtons\(\); // Crear dependencia en la signal
      if \(this\.viewMode\(\) === ViewMode\.MONTH\) \{
        untracked\(\(\) => this\.focusCurrentMonth\(\)\);
      \}
    \}\);

    // Observar cambios en los botones de a.+o para hacer focus cuando cambian
    effect\(\(\) => \{
      this\.yearButtons\(\); // Crear dependencia en la signal
      if \(this\.viewMode\(\) === ViewMode\.YEAR\) \{
        untracked\(\(\) => this\.focusCurrentYear\(\)\);
      \}
    \}\);
  \}
"@

$replacement = @"
  ngAfterViewInit(): void {
    // Si se abri desde un overlay (datepicker), hacer focus en el día seleccionado/actual
    if (this.isOpenedByOverlay()) {
      this.focusInitialDay();
    }

    // Usar runInInjectionContext para ejecutar effects fuera del constructor
    runInInjectionContext(this.injector, () => {
      // Observar cambios en los botones de día para hacer focus cuando cambian
      effect(() => {
        this.dayButtons();
        const focusedIndex = this.focusedDayIndex();
        if (focusedIndex >= 0) {
          untracked(() => this.focusDayButton(focusedIndex));
        }
      });

      // Observar cambios en los botones de mes para hacer focus cuando cambian
      effect(() => {
        this.monthButtons(); // Crear dependencia en la signal
        if (this.viewMode() === ViewMode.MONTH) {
          untracked(() => this.focusCurrentMonth());
        }
      });

      // Observar cambios en los botones de año para hacer focus cuando cambian
      effect(() => {
        this.yearButtons(); // Crear dependencia en la signal
        if (this.viewMode() === ViewMode.YEAR) {
          untracked(() => this.focusCurrentYear());
        }
      });
    });
  }
"@

try {
    $modified = $content -replace $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
    [System.IO.File]::WriteAllText($filePath, $modified, [System.Text.Encoding]::UTF8)
    Write-Host "SUCCESS: File updated successfully"
} catch {
    Write-Host "ERROR: $_"
    exit 1
}
