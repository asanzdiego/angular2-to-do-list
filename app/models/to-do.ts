export interface ToDo {
    id: string;
    name: string;
    editable: boolean;
    animatedClass: string;
    description: string;
    date: Date;
    isAllDay: boolean;
    start: string;
    hhStart: number;
    mmStart: number;
    end: string;
    hhEnd: number;
    mmEnd: number;
    color: string;
    priority: number;
    image: string;
    latitude: number;
    longitude: number;
}
