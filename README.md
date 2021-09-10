# karting-saas

Backend for a karting championships CRM.

We implemented the hexagonal architecture in this backend: https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749?gi=d1fed1f2e01f

We also use DDD to contain all our business logic: https://martinfowler.com/tags/domain%20driven%20design.html

## Developping

- Install depedencies
`yarn`

- Build watch
`yarn build:watch`

- Lint
`yarn lint`

- Unit test
`yarn test:unit`

- Medium test
`yarn test:medium`

- Start express server
`yarn start:express`

## Testing

### Unit testing

To watch unit tests:
`yarn test:unit:watch`

When creating unit test file, use `<filename>.test.ts` add to top of file this header
  
```javascript
/**
 * @group unit
 */
```

### Medium testing

To watch medium tests:
`yarn test:medium:watch`

When creating unit test file, use `<filename>Medium.test.ts` add to top of file this header

```javascript
/**
 * @group medium
 */
```
