import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
export class GetArtikelDTO {
    @IsOptional()
    @IsNotEmpty()
    keyword: string;
}