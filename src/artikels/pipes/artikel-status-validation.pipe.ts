import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ArtikelStatus } from "../artikel-status.enum";

export class ArtikelStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        ArtikelStatus.DRAFT,
        ArtikelStatus.PENDING,
        ArtikelStatus.PUBLISHED
    ];
    transform(value: any) {
        if (value) {
            value = value.toUpperCase();
            if (!this.isValidStatus(value)) {
                throw new BadRequestException(`${value} is an Invalid Status`);
            }
        }

        return value;
    }
    private isValidStatus(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}