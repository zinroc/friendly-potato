import styled from "@emotion/styled";
import { Grid, GridItem } from "../components/common";

const RepoCard = styled.div`
  margin: 10px;
  box-shadow: 2px 2px 2px 2px #d1d1d1;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  line-height: 20px;
  overflow: scroll;
`;

const RepoTitle = styled.div`
  font-weight: 600;
`;

const RepoStats = styled.div`
  color: #757575;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

const RepoStat = styled.div`
  display: inline-flex;
`;

/* 
  @TODO - discuss,
  what is the desired behaviour if the description text is too long?
  Currently the card scrolls.
*/
const RepoDescription = styled.div`
  font-size: 15px;
  font-weight: 300;
`;

const RepoListerGrid = ({ repos }) => (
  <Grid>
    {repos.map((repo) => (
      <GridItem key={repo.id}>
        <RepoCard>
          <RepoTitle>{repo.full_name}</RepoTitle>
          <RepoStats>
            <RepoStat>{repo.stargazers_count} Stargazers</RepoStat>
            <RepoStat>{repo.watchers_count} People Watching</RepoStat>
          </RepoStats>

          <RepoDescription>{repo.description}</RepoDescription>
        </RepoCard>
      </GridItem>
    ))}
  </Grid>
);

export default RepoListerGrid;
