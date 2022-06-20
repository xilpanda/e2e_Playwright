import { test, expect } from '@playwright/test'

test.describe('Feedback Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click('#feedback')
    })

    //Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await page.type("#name", "some name")
        await page.type("#email", "some email@gmail.com")
        await page.type("#subject", "some subject")
        await page.type("#comment", "some comment about app")
        await page.click("input[name='clear']")

        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })

    // Submit feedback form
    test("Submit feedbeck form", async ({ page }) => {
        await page.type("#name", "some name")
        await page.type("#email", "some email@gmail.com")
        await page.type("#subject", "some subject")
        await page.type("#comment", "some comment about app")
        await page.click("input[type='submit']")
        await page.waitForSelector('#feedback-title')
    })
})