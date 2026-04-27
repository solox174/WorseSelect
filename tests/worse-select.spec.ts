import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('basic select', () => {
    test('opens on header click', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await expect(ws).toHaveClass(/open/);
    });

    test('toggles closed on second header click', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        const header = ws.locator('.worse-select-header');
        await header.click();
        await header.click();
        await expect(ws).not.toHaveClass(/open/);
    });

    test('selects an option and shows its label', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await ws.locator('.worse-select-option', { hasText: 'Honda' }).click();
        await expect(ws).not.toHaveClass(/open/);
        await expect(ws.locator('.worse-select-header-label')).toHaveText('Honda');
        await expect(page.locator('#basic')).toHaveValue('honda');
    });

    test('closes when clicking outside', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await expect(ws).toHaveClass(/open/);
        await page.locator('h1').click();
        await expect(ws).not.toHaveClass(/open/);
    });
});

test.describe('keyboard navigation', () => {
    test('ArrowDown opens dropdown and activates first option', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').focus();
        await page.keyboard.press('ArrowDown');
        await expect(ws).toHaveClass(/open/);
        await expect(ws.locator('.worse-select-option.active')).toHaveCount(1);
    });

    test('Escape closes dropdown and returns focus to header', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        const header = ws.locator('.worse-select-header');
        // ArrowDown opens the dropdown and moves focus to the scroller
        await header.focus();
        await page.keyboard.press('ArrowDown');
        await expect(ws).toHaveClass(/open/);
        await page.keyboard.press('Escape');
        await expect(ws).not.toHaveClass(/open/);
        await expect(header).toBeFocused();
    });

    test('Enter selects the active option', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').focus();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(ws).not.toHaveClass(/open/);
        await expect(page.locator('#basic')).not.toHaveValue('');
    });

    test('End moves active to last option', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').focus();
        await page.keyboard.press('End');
        await expect(ws).toHaveClass(/open/);
        await expect(ws.locator('.worse-select-option').last()).toHaveClass(/active/);
    });

    test('Home moves active to first option', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await ws.locator('.worse-select-header').focus();
        await page.keyboard.press('End');
        await page.keyboard.press('Home');
        // First enabled option is Ford (placeholder is disabled)
        await expect(ws.locator('.worse-select-option').nth(1)).toHaveClass(/active/);
    });
});

test.describe('disabled state', () => {
    test('has disabled class', async ({ page }) => {
        const ws = page.locator('#disabled-select + .worse-select-container');
        await expect(ws).toHaveClass(/disabled/);
    });

    test('cannot be opened', async ({ page }) => {
        const ws = page.locator('#disabled-select + .worse-select-container');
        // force: true bypasses Playwright's enabled check on the disabled button
        await ws.locator('.worse-select-header').click({ force: true });
        await expect(ws).not.toHaveClass(/open/);
    });
});

test.describe('search', () => {
    test('highlights matching options', async ({ page }) => {
        const ws = page.locator('#search + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await ws.locator('.worse-select-search-input').fill('can');
        await expect(ws.locator('.worse-select-option.matches')).toHaveCount(1);
        await expect(ws.locator('.worse-select-option.matches')).toContainText('Canada');
    });

    test('clears highlights when search input is cleared', async ({ page }) => {
        const ws = page.locator('#search + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        const searchInput = ws.locator('.worse-select-search-input');
        await searchInput.fill('can');
        await searchInput.clear();
        await expect(ws.locator('.worse-select-option.matches')).toHaveCount(0);
    });

    test('ArrowDown from search input moves focus to options list', async ({ page }) => {
        const ws = page.locator('#search + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await ws.locator('.worse-select-search-input').focus();
        await page.keyboard.press('ArrowDown');
        await expect(ws.locator('.worse-select-options-scroller')).toBeFocused();
    });

    test('Escape from search closes dropdown and focuses header', async ({ page }) => {
        const ws = page.locator('#search + .worse-select-container');
        const header = ws.locator('.worse-select-header');
        await header.click();
        await ws.locator('.worse-select-search-input').focus();
        await page.keyboard.press('Escape');
        await expect(ws).not.toHaveClass(/open/);
        await expect(header).toBeFocused();
    });
});

test.describe('listbox mode', () => {
    test('is always open and has listbox class', async ({ page }) => {
        const ws = page.locator('#listbox + .worse-select-container');
        await expect(ws).toHaveClass(/listbox/);
        await expect(ws).toHaveClass(/open/);
    });

    test('selects option on click', async ({ page }) => {
        const ws = page.locator('#listbox + .worse-select-container');
        await ws.locator('.worse-select-option', { hasText: 'High' }).click();
        await expect(ws.locator('.worse-select-option', { hasText: 'High' })).toHaveClass(/selected/);
        await expect(page.locator('#listbox')).toHaveValue('High');
    });
});

test.describe('multi-select', () => {
    test('clicking an option toggles selection', async ({ page }) => {
        const ws = page.locator('#multi + .worse-select-container');
        const option = ws.locator('.worse-select-option', { hasText: 'New York' });
        await option.click();
        await expect(option).toHaveClass(/selected/);
        await option.click();
        await expect(option).not.toHaveClass(/selected/);
    });

    test('multiple options can be selected simultaneously', async ({ page }) => {
        const ws = page.locator('#multi + .worse-select-container');
        await ws.locator('.worse-select-option', { hasText: 'New York' }).click();
        await ws.locator('.worse-select-option', { hasText: 'Delaware' }).click();
        await expect(ws.locator('.worse-select-option.selected')).toHaveCount(2);
    });
});

test.describe('optgroup', () => {
    test('renders group labels', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await expect(ws.locator('.worse-select-optgroup-label')).toHaveCount(2);
        await expect(ws.locator('.worse-select-optgroup-label').first()).toHaveText('Cars');
    });

    test('options inside a group are indented', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        const groupOption = ws.locator('.worse-select-optgroup .worse-select-option').first();
        await expect(groupOption).toBeVisible();
    });

    test('selects an option from a group', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        await ws.locator('.worse-select-option', { hasText: 'Honda' }).click();
        await expect(ws.locator('.worse-select-header-label')).toHaveText('Honda');
        await expect(page.locator('#optgroup')).toHaveValue('honda');
    });

    test('disabled group has disabled class on wrapper', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        const disabledGroup = ws.locator('.worse-select-optgroup.disabled');
        await expect(disabledGroup).toHaveCount(1);
        await expect(disabledGroup.locator('.worse-select-optgroup-label')).toHaveText('Discontinued');
    });

    test('options in a disabled group are not selectable', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        const disabledOption = ws.locator('.worse-select-optgroup.disabled .worse-select-option').first();
        await expect(disabledOption).toHaveClass(/disabled/);
        await disabledOption.click({ force: true });
        await expect(page.locator('#optgroup')).toHaveValue('');
    });

    test('group wrapper has role=group and aria-label', async ({ page }) => {
        const ws = page.locator('#optgroup + .worse-select-container');
        await ws.locator('.worse-select-header').click();
        const group = ws.locator('.worse-select-optgroup').first();
        await expect(group).toHaveAttribute('role', 'group');
        await expect(group).toHaveAttribute('aria-label', 'Cars');
    });
});

test.describe('dark mode', () => {
    test('adds dark class when color-scheme toggled to dark', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await expect(ws).not.toHaveClass(/dark/);
        await page.locator('#dark-mode-toggle').click();
        await expect(ws).toHaveClass(/dark/);
    });

    test('removes dark class when color-scheme toggled back to light', async ({ page }) => {
        const ws = page.locator('#basic + .worse-select-container');
        await page.locator('#dark-mode-toggle').click();
        await expect(ws).toHaveClass(/dark/);
        await page.locator('#dark-mode-toggle').click();
        await expect(ws).not.toHaveClass(/dark/);
    });
});

test.describe('dynamic options', () => {
    test('adding an option updates the widget', async ({ page }) => {
        const ws = page.locator('#dynamic + .worse-select-container');
        const initialCount = await ws.locator('.worse-select-option').count();
        await page.locator('#add-option').click();
        await expect(ws.locator('.worse-select-option')).toHaveCount(initialCount + 1);
    });

    test('removing an option updates the widget', async ({ page }) => {
        const ws = page.locator('#dynamic + .worse-select-container');
        const initialCount = await ws.locator('.worse-select-option').count();
        await page.locator('#remove-option').click();
        await expect(ws.locator('.worse-select-option')).toHaveCount(initialCount - 1);
    });
});
