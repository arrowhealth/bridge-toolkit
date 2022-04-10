# Bridge Emulator

The emulator is a local development environment that can be used for developing and testing your applications within Bridge without the need of integrating or using an EHR. The emulator is uses the latest version of Bridge available to users
via the Browser extensions.

## Setup dependencies

```
pnpm i
```

## Running the emulator standalone

```
pnpm dev
```

## Configuring the emulator

The emulator has a few configurable files located in the [public](public) directory.

* `auth.json` - it is most likely that you will not modify this file.
* `config.json` - modify this file add your own applications
* `patients.json` - modify this file to add your own mock patients