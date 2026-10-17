import type { FriendGroup, University } from '@/types'

export const universities: University[] = [
  { id: 'uni_ada', name: 'ADA Universiteti', shortName: 'ADA', memberCount: 1840, monthlyPoints: 48250, monthlyVisits: 386, rankDelta: 1 },
  { id: 'uni_bdu', name: 'Bakı Dövlət Universiteti', shortName: 'BDU', memberCount: 6210, monthlyPoints: 61400, monthlyVisits: 512, rankDelta: 0 },
  { id: 'uni_unec', name: 'Azərbaycan Dövlət İqtisad Universiteti', shortName: 'UNEC', memberCount: 5480, monthlyPoints: 52900, monthlyVisits: 441, rankDelta: -1 },
  { id: 'uni_adnsu', name: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', shortName: 'ADNSU', memberCount: 4120, monthlyPoints: 33800, monthlyVisits: 270, rankDelta: 2 },
  { id: 'uni_atu', name: 'Azərbaycan Tibb Universiteti', shortName: 'ATU', memberCount: 3650, monthlyPoints: 27600, monthlyVisits: 221, rankDelta: -1 },
  { id: 'uni_xezer', name: 'Xəzər Universiteti', shortName: 'Xəzər', memberCount: 1260, monthlyPoints: 21400, monthlyVisits: 175, rankDelta: 1 },
  { id: 'uni_qafqaz', name: 'Qafqaz Universiteti', shortName: 'Qafqaz', memberCount: 980, monthlyPoints: 14200, monthlyVisits: 118, rankDelta: 0 },
  { id: 'uni_bmu', name: 'Bakı Mühəndislik Universiteti', shortName: 'BMU', memberCount: 2340, monthlyPoints: 18900, monthlyVisits: 152, rankDelta: -2 },
]

export const friendGroups: FriendGroup[] = [
  { id: 'group_nar', name: 'Nar Komandası', icon: 'nar', inviteCode: 'NAR-2026', memberIds: [], monthlyGoal: 20 },
  { id: 'group_buta', name: 'Buta Ovçuları', icon: 'buta', inviteCode: 'BUTA-77', memberIds: [], monthlyGoal: 15 },
  { id: 'group_qala', name: 'Qala Gəzənlər', icon: 'qala', inviteCode: 'QALA-15', memberIds: [], monthlyGoal: 25 },
]
