import axiosRequest from '@/plugins/axios-request';
export default {
  namespace: 'app',
  state: {
    headerTabs: [],
    teams: [],
    currentTeam: null,
    createTeamErrorMsg: null,
    projects: [],
    currentProject: null,
    deployments: [],
  },
  reducers: {
    setHeaderTabs(state: any, action: any) {
      state.headerTabs = action.payload;
    },
    setTeams(state: any, action: any) {
      state.teams = action.payload;
    },
    setCurrentTeam(state: any, action: any) {
      state.currentTeam = action.payload;
    },
    switchCurrentTeam(state: any, action: any) {
      state.currentTeam = action.payload;
    },
    setProjects(state: any, action: any) {
      state.projects = action.payload;
    },
    setCurrentProject(state: any, action: any) {
      state.currentProject = action.payload;
    },
    setCreateTeamErrorMsg(state: any, action: any) {
      state.createTeamErrorMsg = action.payload;
    },
    setDeployments(state: any, action: any) {
      state.deployments = action.payload;
    },
  },
  effects: {
    *setTeamsAsync(_action: any, { put }: any): any {
      const result = yield axiosRequest.get(`teams`);
      const { teamSlug } = _action.payload;
      yield put({ type: 'setTeams', payload: result.teams });
      yield put({
        type: 'setCurrentTeam',
        payload:
          result.teams.find((team: any) => team.slug === teamSlug) ||
          result.teams[0],
      });
    },

    *setProjectsAsync(_action: any, { put }: any): any {
      const { projects } = yield axiosRequest.get(`projects`, {
        params: {
          teamId: _action.payload.teamId,
        },
      });

      // yield put({ type: 'setCreateTeamError', payload: err });
      yield put({ type: 'setProjects', payload: projects });
    },
    *setProjectDetail(_action: any, { put }: any): any {
      const { project } = yield axiosRequest.get(`projects/detail`, {
        params: {
          teamId: _action.payload.teamId,
          slug: _action.payload.slug,
        },
      });
      yield put({ type: 'setCurrentProject', payload: project });
    },
    *setDeploymentsAsync(_action: any, { put }: any): any {
      const { deployments } = yield axiosRequest.get(`deployments`, {
        params: {
          teamId: _action.payload.teamId,
          projectId: _action.payload.projectId,
        },
      });
      yield put({ type: 'setDeployments', payload: deployments });
    },

    *throwError(_action: any) {
      throw new Error('effect error');
    },
  },
};
