import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { ArtikelStatus } from "../artikel-status.enum";
export class GetArtikelDTO {
    @IsOptional()
    @IsIn([ArtikelStatus.DRAFT, ArtikelStatus.PENDING, ArtikelStatus.PUBLISHED])
    status: ArtikelStatus;
    @IsOptional()
    @IsNotEmpty()
    keyword: string;
}