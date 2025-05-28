import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page, Browser, BrowserContext } from "playwright";

let browser: Browser;
let context: BrowserContext;
let page: Page;

const LOGIN_URL = "https://petstore.octoperf.com/actions/Catalog.action";

Given('el usuario está en la página de login', {timeout: 50000}, async function () {
    console.log(`aquiii empieza la navegacion`);
    browser = await chromium.launch({ headless: true }); // Mostrar el navegador
    console.log(`aquiii continua1`);
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(LOGIN_URL);
    console.log(`aquiii conitnua2`);
    await page.click('text=Sign In');
    console.log(`aquiii termina de identificar el texto para emepzar logueo`);
});

When('se identifica con credenciales válidas', async function () {
    console.log(`aquiii empieza logueo correcto`);
    await page.fill('input[name="username"]', 'Armando');
    await page.fill('input[name="password"]', 'abril2026');
    await page.click('input[name="signon"]');
    console.log(`aquiii termina logueo correcto y espero mensaje`);
});

Then('debería ver su panel de usuario', async function () {
    await expect(page.locator('text=Welcome Armando!')).toBeVisible();
    await browser.close();
});

When('se identifica con credenciales inválidas', async function () {
    console.log(`aquiii empieza logueo incorrecto`);
    await page.fill('input[name="username"]', 'ArmandoII');
    await page.fill('input[name="password"]', 'contrasenaXX');
    await page.click('input[name="signon"]');
    console.log(`aquiii termina logueo incorrecto y espero mensaje`);
});

Then('debería ser informado que sus credenciales son incorrectas', async function () {
    const errorLocator = page.locator('li', {
        hasText: 'Invalid username or password. Signon failed.',
    });
    await expect(errorLocator).toBeVisible();
    await browser.close();
});