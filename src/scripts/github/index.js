import { mainGitHubAccount} from './githubAccount.js'
import { mainRepoMetrics} from './githubReposMetrics.js'
import { mainPullRequests} from './githubPullRequests.js'

async function main() {
  await mainGitHubAccount();
  await mainRepoMetrics();
  await mainPullRequests();
}

main();
