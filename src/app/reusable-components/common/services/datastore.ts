import { BehaviorSubject } from 'rxjs';
import randomColor from '../shared/RandomColorGenerator';

export class Datastore {

    private static ColorSeed = 1;



    private static filesSubject: BehaviorSubject<any> = new BehaviorSubject([])
    private static formSchemaSubject: BehaviorSubject<any> = new BehaviorSubject(undefined)


    public static get Files() {
        return Datastore.filesSubject;
    }
    public static get FormSchema() {
        return Datastore.formSchemaSubject;
    }

    public static get getRandmColor() {
        this.ColorSeed += 1
        return randomColor({ seed: this.ColorSeed })
    }

}