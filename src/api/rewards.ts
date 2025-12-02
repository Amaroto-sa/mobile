import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {ApiResponse, RewardEntry} from './types';

type ProfilePayload = ApiResponse<{
  user: {id: number};
  reward_points: number;
}>;

export const fetchRewardsSummary = async () => {
  const res = (await apiFetch(endpoints.rewards.summary, {
    method: 'GET',
  })) as ProfilePayload;
  const id = res.data?.user?.id;
  return {
    ...res,
    data: {
      points: res.data?.reward_points ?? 0,
      referral_code: id ? `CSH${id}` : 'CSH----',
    },
  };
};

export const fetchRewardsHistory = async () => ({
  success: true,
  message: 'Loaded',
  data: [] as RewardEntry[],
});
