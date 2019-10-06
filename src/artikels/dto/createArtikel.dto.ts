import { IsNotEmpty } from "class-validator";

export class CreateArtikelDTO {

    @IsNotEmpty()
    title: String;
    @IsNotEmpty()
    content: String;
    @IsNotEmpty()
    category: String;

}