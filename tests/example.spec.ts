import { test, expect } from '@playwright/test'

import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText("Example Domain")
})

test("Clickin on Elements", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
    
})

test.skip('Selectors', async ({ page }) => {
    // text
   await page.click('text=some text')

    // Css Selectors
    await page.click('buton')
    await page.click('#id')
    await page.click('.class')

    // Only visibile Css Selector
    await page.click('.submit-button:visible')

    // Combinations
    await page.click('#username.first')

    // XPath
   await page.click('//button')
 })

test.describe("My firs test suite", () => {

    test('Working with Inputs', async ( { page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click('#signin_button')
    
        await page.type('#user_login' , 'some username')
        await page.type('#user_password' , 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    }) 
    
    test('Assertions @myTag', async ({ page }) => {
        await page.goto('https://example.com/')
        await expect(page).toHaveURL('https://example.com/')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain")
        await expect(element).toHaveCount(1)
    
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })

})

test.describe.parallel.only("Hooks", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')
    })

    test("Screenshots", async ({ page }) => {
        // 1. step is loaded website
        // await page.goto('https://example.com/')
        // 2 take screenshot of full page
        await page.screenshot({ path: 'screenshot.png', fullPage: true})
    })
    
    test("Single element Sreenshot", async ({ page }) => {
        // await page.goto('https://example.com/')
        const element = await page.$('h1')
        await element?.screenshot({ path: "single_element_screenshot.png" })
    })
})

test('Custom Helpers', async ({ page }) => {
    await loadHomepage(page)
    // await page.pause()
    await assertTitle(page)
})