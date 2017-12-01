import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "msToHrs",
    pure: false
})
export class MillisecondsToHoursPipe implements PipeTransform {

    transform(ms: number): String {
        let secs = ms / 1000;
        let mins = secs / 60;
        let hrs  = Math.floor(mins / 60); // number of hours rounded down
        mins = Math.round(mins % 60);
        return `${hrs} hours ${mins} minutes`;
    }
}