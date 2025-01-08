/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      tsconfig: {
        strictNullChecks: false,
        noImplicitAny: false,
      },
    }],
  },
};