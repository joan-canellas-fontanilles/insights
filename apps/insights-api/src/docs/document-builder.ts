import { DocumentBuilder } from '@nestjs/swagger';

const description =
  'Handles all of the operations related to the storage and retrieval of metric data. ' +
  'It provides a set of endpoints that allow users to post new metrics, retrieve existing metrics, and visualize them on a timeline.';

export const config = new DocumentBuilder()
  .setTitle('Insights API')
  .setDescription(description)
  .setVersion('1.0')
  .build();
