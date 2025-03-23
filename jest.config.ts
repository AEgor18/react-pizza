import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest', // Если вы используете TypeScript
	testEnvironment: 'jsdom', // Для тестирования в браузерной среде
	moduleNameMapper: {
		'^react-router-dom$': require.resolve('react-router-dom'),
	},

	transform: {
		'^.+\\.tsx?$': 'ts-jest', // Если используете TypeScript
	},
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect', // Подключаем дополнительные matchers для jest-dom
	],
	collectCoverage: true, // Собираем информацию о покрытии тестами
	coverageDirectory: 'coverage', // Директория для отчета по покрытиям
	testPathIgnorePatterns: ['/node_modules/'], // Игнорируем папку node_modules при поиске тестов
};

export default config;
