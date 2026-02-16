const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'projects/nui/src/lib/components/calendar/calendar.component.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the effects section
const startMarker = 'if (this.isOpenedByOverlay()) {';
const endMarker = 'private initializeCalendar(): void {';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const beforeSection = content.substring(0, startIdx);
  const afterSection = content.substring(endIdx);
  
  const newSection = `if (this.isOpenedByOverlay()) {
      this.focusInitialDay();
    }

    // Usar runInInjectionContext para ejecutar effects fuera del constructor
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.dayButtons();
        const focusedIndex = this.focusedDayIndex();
        if (focusedIndex >= 0) {
          untracked(() => this.focusDayButton(focusedIndex));
        }
      });

      effect(() => {
        this.monthButtons();
        if (this.viewMode() === ViewMode.MONTH) {
          untracked(() => this.focusCurrentMonth());
        }
      });

      effect(() => {
        this.yearButtons();
        if (this.viewMode() === ViewMode.YEAR) {
          untracked(() => this.focusCurrentYear());
        }
      });
    });
  }

  `;

  const modifiedContent = beforeSection + newSection + afterSection;
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
  console.log('✅ File updated successfully');
} else {
  console.error('❌ Could not find markers in file');
}
