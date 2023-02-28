import CMS from '@staticcms/core';
import { config } from "./config";
import { UUIDWidget } from "./widgets/uuid";
import { YoutubeWidget } from "./widgets/youtube";

// @ts-expect-error
window.CMS = CMS;

CMS.registerWidget([
  UUIDWidget(),
  YoutubeWidget(),
]);

CMS.init({
  config,
});
