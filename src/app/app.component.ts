import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Group } from './components/models'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public data = {
        groups: [],
        percent: 2,
        seats: 5
    } as {
        groups: Group[],
        percent: number,
        seats: number
    }


    // load from local
    ngOnInit() {
        const local = JSON.parse(localStorage.groups ?? null)
        if (local) {
            this.data.groups = local
        }
    }

    addGroup(group: Group) {
        this.data.groups.push(group)

        localStorage.groups = JSON.stringify(this.data.groups ?? [])
    }

    deleteGroup(index: number) {
        if (index < 0) return
        this.data.groups.splice(index, 1)

        localStorage.groups = JSON.stringify(this.data.groups ?? [])
    }

    clearHistory() {
        if (!confirm('Are you sure?')) return

        this.data.groups = []
        localStorage.groups = JSON.stringify([])
    }


    // calc the first pass number base on votes and seats, all above percent
    get passedNumber(): number {
        const sum = this._votesAmount(this.data.groups)

        return sum / this.data.seats * this.data.percent
    }

    // generate a filtered list of all groups that passed the base percent
    get passedList(): Group[] {
        return this.data.groups.filter(g => g.amount >= this.passedNumber)
    }

    // calc the new must-number of the remaining groups
    get newPassedNumber(): number {
        const sum = this._votesAmount(this.passedList)

        return sum / this.data.seats * this.data.percent
    }

    // generate the final list of the groups, base on the final-pass-number
    get newPassedList(): Group[] {
        const mandatVal = this._mandatValue(this.passedList, this.data.seats)

        const res = this.passedList
            .filter(g => g.amount >= this.newPassedNumber)
            .map((g: Group) => ({
                ...g,
                mandats: +Math.floor(g.amount / mandatVal),
                spear: g.amount % mandatVal,
            }))


        // return the all groups with 1 mandat if non-passed exists
        if (!res.length) {
            return this.data.groups
                .sort((g1, g2) => g2.amount - g1.amount)
                .filter((g, index) => index < this.data.seats)
                .map(g => ({ ...g, mandats: 1 }))
        }


        // sort by the spear of the amount
        res.sort((g1, g2) => g2.spear - g1.spear)

        let takenMandats = res.reduce((acc, g) => {
            return acc + g.mandats
        }, 0)


        // adding left spears
        while (takenMandats < this.data.seats) {
            res.forEach(g => {
                if (takenMandats < this.data.seats) {
                    g.mandats++
                    takenMandats++
                }
            })
        }

        // sort by mandats achieved
        res.sort((g1, g2) => g2.mandats - g1.mandats)
        return res
    }


    _mandatValue(list: Group[], seats: number): number {
        const sum = this._votesAmount(list)

        return sum / seats
    }

    _votesAmount(list: Group[]): number {
        return list.reduce((acc, g) => {
            return acc + g.amount
        }, 0)
    }
}
