import { test, expect } from '@playwright/test'


test('update pet type', async ({ page }) => {
    await test.step('Open the Pet Types page', async () => {
        await page.goto('/');
        await expect(page.getByRole('progressbar')).toBeHidden({ timeout: 30_000 });
        await page.getByRole('link', { name: 'Pet Types' }).click();
        await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible();
    });

    const petTypeRow = page.getByRole('row').filter({ has: page.locator('[id="0"]') })
    const editButton = petTypeRow.getByRole('button', { name: 'Edit' })
    const nameField = page.getByRole('textbox')
    const updateButton = page.getByRole('button', { name: 'Update' })

    await test.step('Update the pet type name to rabbit', async () => {
        await editButton.click()
        await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()
        await nameField.click()
        await nameField.fill('rabbit')
        await updateButton.click()
        await expect(
            petTypeRow.getByRole('textbox'),
            'The pet type row should show the updated name'
        ).toHaveValue('rabbit')
    })

    await test.step('Restore the pet type name to cat', async () => {
        await editButton.click()
        await nameField.click()
        await nameField.fill('cat')
        await updateButton.click()
        await expect(
            petTypeRow.getByRole('textbox'),
            'The pet type row should show the restored name'
        ).toHaveValue('cat')
    })

})

