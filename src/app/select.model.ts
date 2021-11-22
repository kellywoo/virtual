import { Observable } from 'rxjs';
import { TemplateRef } from '@angular/core';

export const LazySelectTransformRange = {
    translate: 1,
    profile: 2,
} as const;
export type LazySelectTransformRange = typeof LazySelectTransformRange[keyof typeof LazySelectTransformRange];

interface DisplayRequired {
    name: string;
    loading?: boolean;
}

interface DisplayIcon extends DisplayRequired {
    icon?: string;
}

interface DisplayProfile extends DisplayRequired {
    color?: string;
    image?: string;
}

export type LazySelectOptionDisplay = DisplayRequired | DisplayIcon | DisplayProfile;

export interface RoomProfilePipeParam {
    type: 'room';
    members: string[];
    memberCount: number;
    title?: string;
    userId: string;
}

export interface UserProfilePipeParam {
    type: 'user';
    userId: string;
}

export interface DefaultProfilePipeParam {
    type: 'profile';
    isMe?: boolean;
    color?: string;
    image?: string;
    icon?: string;
}

export type ProfilePipeParam = RoomProfilePipeParam | UserProfilePipeParam | DefaultProfilePipeParam;

export interface LazySelectOptionItem<A extends ProfilePipeParam = ProfilePipeParam> {
    value: string; // key value
    name: string; // displayed name
    profilePipeParam?: A; // profile source
    translate?: boolean;
    className?: string;
    info?: any;
}

export interface LazySelectOptionItemOutput {
    display?: LazySelectOptionDisplay;
    option: LazySelectOptionItem;
}

export interface LazySelectOptionState {
    isFetchingQuery: boolean;
    isFetchingNext: boolean;
    dynamicList: LazySelectOptionItem[];
    canLoadNext: boolean;
    offset: any;
    query: string;
}

export type LazySelectOptionInput = Pick<LazySelectOptionState, 'offset' | 'query'>;
export type LazySelectOptionOutput = Pick<LazySelectOptionState, 'offset' | 'canLoadNext'> & { listToAdd: LazySelectOptionItem[] };

export type LazySelectOptionQuery = (param: LazySelectOptionInput) => Observable<LazySelectOptionOutput>;
export type LazySelectOptionRole = 'checkbox' | 'radio' | 'checked' | '';

export interface LazySelectChangeState {
    item: LazySelectOptionItem;
    type: 'remove' | 'add';
}

export interface LazySelectOptionGroup<A = LazySelectOptionItem> {
    title?: string;
    translate?: boolean;
    items: Array<A>;
}

export type LazySelectSearchEventType = 'enter' | 'value' | null;

export type LazySelectOptionSelectedMap = Record<string, 1>;

export type LazySelectOptionSelected = LazySelectOptionSelectedMap | string | Set<string> | Array<string>;
export type LazySelectItemTemplate = TemplateRef<{ item: LazySelectOptionItem, keyword: string; display: LazySelectOptionDisplay }>;
export type LazySelectButtonTemplate = TemplateRef<{ item: LazySelectOptionItem, keyword: string; display: LazySelectOptionDisplay }>;

export interface LazySelectDisplayState {
    items: Array<LazySelectOptionGroup<LazySelectOptionItemOutput>>;
    prefix: Array<LazySelectOptionGroup<LazySelectOptionItemOutput>>;
    suffix: Array<LazySelectOptionGroup<LazySelectOptionItemOutput>>;
    transformOption: LazySelectTransformRange;
    listMap: Record<string, LazySelectOptionItemOutput>;
}

export interface LazySelectDisplayParam {
    items: Array<LazySelectOptionGroup>;
    prefix: Array<LazySelectOptionGroup>;
    suffix: Array<LazySelectOptionGroup>;
    transformOption: LazySelectTransformRange;
    init: LazySelectOptionItem[];
}

export type LazySelectOptionGroupOutput = LazySelectOptionGroup<LazySelectOptionItemOutput>;
export interface LazyDisplayOptions {
    prefix: LazySelectOptionGroupOutput[];
    suffix: LazySelectOptionGroupOutput[];
    content: LazySelectOptionGroupOutput[];
    sequence: string[];
}

export interface LazySelectComponentState extends LazySelectDisplayState {
    isOpen: boolean;
    isFetchingQuery: boolean;
    isFetchingNext: boolean;
    canLoadNext: boolean;
    offset: string | null; // start point of loading more
    focusValue: string | null;
}
