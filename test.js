import {test, expect} from '@playwright/test';

const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Шаг 1: Перейти на главную страницу www.sima-land.ru
        await page.goto('https://www.sima-land.ru/');

    // Шаг 2: Нажать на кнопку "Войти" в хедере
        await page.click('.header__auth-link');

    // Шаг 3: Ввести логин: qa_test@test.ru
        await page.fill('#authForm [name="LOGIN"]', 'qa_test@test.ru');

    // Шаг 4: Ввести пароль: qa_test
        await page.fill('#authForm [name="PASSWORD"]', 'qa_test');

    // Шаг 5: Нажать кнопку "Войти"
        await Promise.all([
        page.waitForNavigation(),
        page.click('#authForm [type="submit"]'),
    ]);

    // Шаг 6: Проверить, что авторизация прошла успешно
        const successMessage = await page.$('.header__auth-success');
        if (!successMessage) {
        throw new Error('Авторизация не удалась');
        }

    // Закрыть браузер
        await browser.close();
})();