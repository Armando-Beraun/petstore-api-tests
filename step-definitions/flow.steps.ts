import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { loginEnPetStore } from '../support/actions/login';

let browser: Browser;
let page: Page;

Given('el cliente ingresa a la tienda virtual de PetStore', {timeout: 50000}, async () => {
    console.log(`aquiii empieza la navegacion`);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
    //await page.goto('https://petstore.octoperf.com/actions/Catalog.action');
    await page.goto('https://petstore.octoperf.com/actions/Catalog.action', {timeout: 50000});
    console.log(`aquiii termina el ingreso a la web`);
});

When('se identifica como {string} con la contraseña {string}', async (usuario: string, contraseña: 
string) => {
    await loginEnPetStore(page, usuario, contraseña);
    await expect(page.locator('text=Sign Out')).toBeVisible();
});

When('explora la sección de mascotas en adopción', async () => {
    await page.click('#SidebarContent a[href*="categoryId=DOGS"]');
});

When('elige la mascota {string}', async (producto: string) => {
    await page.click(`//tr[td[text()='${producto}']]/td[1]/a`);
}); 

When('la incluye en su pedido', async () => {
    console.log(`se ejcutó su pedido`);
    await page.click('a.Button[href*="addItemToCart=&workingItemId=EST-26"]');
});

Then('debería ver {string} en el resumen de su compra.', async (producto: string) => {
    console.log(`Producto es: ${producto}`);
    await expect(page.locator('td', { hasText: producto })).toBeVisible();
    await browser.close();
});