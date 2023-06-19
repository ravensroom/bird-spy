import axios from 'axios';
import { writeFile } from 'fs/promises';

const dummyUrl =
  'https://www.linkedin.com/jobs/view/backend-software-engineer-tiktok-privacy-ai-at-tiktok-3521244560?refId=JOzHAJ6WpAgfeNRyouft%2Fw%3D%3D&trackingId=6XUQSgJBqKfgf87UvnhTLg%3D%3D&position=25&pageNum=0&trk=public_jobs_jserp-result_search-card';
const response = await axios.get(dummyUrl);
const html = response.data;

const htmlFilePath = './jd-page.html';

writeFile(htmlFilePath, html);
