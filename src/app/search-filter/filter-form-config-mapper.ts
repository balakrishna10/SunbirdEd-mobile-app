import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CommonUtilService } from '@app/services/common-util.service';
import {FieldConfig, FieldConfigInputType, FieldConfigValidationType} from 'common-form-elements';
import { FilterValue } from 'sunbird-sdk';

@Injectable()
export class FilterFormConfigMapper {
    constructor(
        private commonUtilService: CommonUtilService,
        private titlecasePipe: TitleCasePipe
    ) {
        
    }
    private static order = [
        'board',
        'medium',
        'gradeLevel',
        'subject',
        'publisher',
        'mimeType',
        'primaryCategory'
    ];

    map(facetFilters: { [key: string]: FilterValue[] }, defaults: { [field: string]: any }): FieldConfig<string>[] {
        return Object.keys(facetFilters).reduce<FieldConfig<string>[]>((acc, key) => {
            switch (key) {
                case 'board': {
                    acc.push({
                        code: 'board',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'board',
                        default: (defaults && defaults['board']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('BOARD'),
                            placeHolder: 'Select Board',
                            multiple: false,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        },
                        validations: [
                            {
                                type: FieldConfigValidationType.REQUIRED
                            }
                        ]
                    });
                    break;
                }
                case 'medium': {
                    acc.push({
                        code: 'medium',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'medium',
                        default: (defaults && defaults['medium']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('MEDIUM'),
                            placeHolder: 'Select Medium',
                            multiple: true,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
                case 'gradeLevel': {
                    acc.push({
                        code: 'gradeLevel',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'gradeLevel',
                        default: (defaults && defaults['gradeLevel']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('CLASS'),
                            placeHolder: 'Select Class',
                            multiple: true,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
                case 'subject': {
                    acc.push({
                        code: 'subject',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'subject',
                        default: (defaults && defaults['subject']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('SUBJECT'),
                            placeHolder: 'Select Subject',
                            multiple: true,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
                case 'publisher': {
                    acc.push({
                        code: 'publisher',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'publisher',
                        default: (defaults && defaults['publisher']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('PUBLISHER'),
                            placeHolder: 'Select publisher',
                            multiple: true,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
                case 'mimeType': {
                    acc.push({
                        code: 'mimeType',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'mediaType',
                        default: (defaults && defaults['mediaType']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('FRMELEMNTS_LBL_MEDIA_TYPE'),
                            placeHolder: 'Select Media Type',
                            multiple: true,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
                case 'primaryCategory': {
                    acc.push({
                        code: 'primaryCategory',
                        type: FieldConfigInputType.SELECT,
                        fieldName: 'primaryCategory',
                        default: (defaults && defaults['primaryCategory']) || null,
                        templateOptions: {
                            label: this.commonUtilService.translateMessage('FRMELEMENTS_LBL_CONTENT_TYPE'),
                            placeHolder: 'Select Content Type',
                            multiple: false,
                            hidden: false,
                            disabled: false,
                            options: facetFilters[key].map((f) => ({
                                label: this.titlecasePipe.transform(f.name),
                                value: f.name
                            }))
                        }
                    });
                    break;
                }
            }
            return acc;
        }, []).sort((a, b) => {
            if (
                FilterFormConfigMapper.order.includes(a.code) &&
                FilterFormConfigMapper.order.includes(b.code)
            ) {
                return FilterFormConfigMapper.order.indexOf(a.code) - FilterFormConfigMapper.order.indexOf(b.code);
            }
            return 1;
        });
    }
}