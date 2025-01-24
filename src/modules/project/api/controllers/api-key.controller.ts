import { GenerateApiKey } from '@modules/project/application/usecases';
import { Controller, Param, Patch } from '@nestjs/common';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly generateNewKey: GenerateApiKey) {}

  @Patch(':projectId')
  async generate(@Param('projectId') projectId: string) {
    return await this.generateNewKey.execute({ projectId });
  }
}
