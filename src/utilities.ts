import routeFn from 'ziggy-js'
import {Ziggy} from '@/ziggy'



// @ts-ignore
export const route: typeof routeFn = function() {
    const args = arguments

    return routeFn(
        args[0],
        args[1] ?? undefined,
        args[2] ?? undefined,
        args[3] ?? Ziggy,
    )
}
