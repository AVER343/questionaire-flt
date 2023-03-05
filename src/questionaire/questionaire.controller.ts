import { Controller, Get } from '@nestjs/common';
// questions can  be  of random topic
// questions can be set and if so casn be random in order
@Controller('questionaire')
export class QuestionaireController {
    //same quextions , random or in same order 
    @Get('/:id')
    getQuestionaireByID() {
        return {};
    }
    

}
