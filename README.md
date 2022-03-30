# Bridge Application Development Toolkit

The Bridge Application Development Toolkit provides the resources needed to get started to develop applications in using
today's popular JavaScript Frameworks.

## What is included?

The project provide starters application built using [Bridge SDK](https://arrowhealth.github.io/bridge-sdk/) on different platforms:

- [Vanilla JS](vanilla)
- [React](react)
- [Vue](vue)
- [Svelte](svelte)

Each platform provides an Application and a SmartTile example.

## Emulator

The toolkit also provides an emulator using the latest version of the Bridge platform to test your applications. The emulator
allows you to configure your applications as well as patient information for testing against your services.

## Getting started

It is recommended to install `pnpm`, today's most widely supported package manager for node.

Click here to install: https://pnpm.io/installation

### Install dependencies

```shell
pnpm install:all
```

### Running React Project

The following command will run the Emulator, Application and SmartTile projects concurrently from a single commandline.

```shell
pnpm react
```

### Running Svelte Project

The following command will run the Emulator, Application and SmartTile projects concurrently from a single commandline.

```shell
pnpm svelte
```

### Running Vanilla Project

The following command will run the Emulator, Application and SmartTile projects concurrently from a single commandline.

```shell
pnpm vanilla
```

### Running Vue Project

The following command will run the Emulator, Application and SmartTile projects concurrently from a single commandline.

```shell
pnpm vue
```

The projects will run on the following ports:

* **Emulator** -  http://localhost:4000
* **Application** - http://localhost:4001
* **SmartTile** - http://localhost:4002

Open the emulator you should open in your browser to see the examples.


## Configuring the emulator

The emulator has a few configurable files located in the [emulator/public](emulator/public) directory.

* `auth.json` - it is most likely that you will not modify this file.
* `config.json` - modify this file add your own applications
* `patients.json` - modify this file to add your own mock patients
