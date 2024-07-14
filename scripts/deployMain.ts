import { address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(
        Main.createFromConfig(
            {
                number: 15, // initial value of counter
                address: address('0QD_oe-OXwJum1qQlTRYmxwEJS6jlil-giJ1BgxKZq7OFYYb'),
                owner_address: address('0QD_oe-OXwJum1qQlTRYmxwEJS6jlil-giJ1BgxKZq7OFYYb'),
            },
            await compile('Main'),
        ),
    );

    await main.sendDeploy(provider.sender(), toNano('0.01'));

    await provider.waitForDeploy(main.address);

    // run methods on `main`
}
