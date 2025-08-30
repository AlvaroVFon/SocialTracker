import type { AccountCardProps } from '@/components/ui/accountcard/AccountCardProps'

export const githubAccount: AccountCardProps = {
  username: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  iconName: 'Github',
  iconColor: '#181717',
  bio: 'GitHub mascot and friendly helper.',
  company: 'GitHub',
  location: 'San Francisco',
  public_repos: 8,
  followers: 3939,
  following: 9,
  created_at: '2011-01-25',
}

export const linkedinAccount: AccountCardProps = {
  username: 'janedoe',
  name: 'Jane Doe',
  avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
  iconName: 'Linkedin',
  iconColor: '#0A66C2',
  bio: 'Marketing Specialist at Acme Corp.',
  company: 'Acme Corp.',
  location: 'Madrid, España',
  followers: 1200,
  created_at: '2015-06-10',
}

export const twitterAccount: AccountCardProps = {
  username: 'elonmusk',
  name: 'Elon Musk',
  avatar_url: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg',
  iconName: 'Twitter',
  iconColor: '#1DA1F2',
  bio: 'Mars, Cars, Chips, Starships. Tweets sometimes.',
  location: 'Mars',
  followers: 149000000,
  following: 100,
  created_at: '2009-06-02',
}

export const instagramAccount: AccountCardProps = {
  username: 'natgeo',
  name: 'National Geographic',
  avatar_url:
    'https://instagram.fmad3-4.fna.fbcdn.net/v/t51.2885-19/11820650_1625907977662747_180064660_a.jpg',
  iconName: 'Instagram',
  iconColor: '#C13584',
  bio: 'Experience the world through the eyes of National Geographic photographers.',
  followers: 282000000,
  created_at: '2011-01-01',
}
