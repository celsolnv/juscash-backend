import moment from 'moment-timezone';

const GetCurrentDateHelperMethod = () => {
  return moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');
};

const GetCurrentDateHelperMethodWithTime = () => {
  return moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
};

export { GetCurrentDateHelperMethod, GetCurrentDateHelperMethodWithTime };
