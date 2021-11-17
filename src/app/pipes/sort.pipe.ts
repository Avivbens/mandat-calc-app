import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(value: Array<any>, ...args: unknown[]): Array<any> {
        console.log('🚀 ~ args', args)
        const selector = args[0] as string
        const order = args[1]

        if (order === 'top') {
            return value.sort((v1, v2) => v2[selector] - v1[selector])
        } else {
            return value.sort((v1, v2) => v1[selector] - v2[selector])
        }
    }

}
