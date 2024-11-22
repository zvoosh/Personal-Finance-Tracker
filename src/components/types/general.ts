export type Rows = {
  novac: string;
  ulaz: string;
  izlaz: string;
  noci: string;
  odrasli?: Number;
  deca?: Number;
  ljubimac?: Number;
  zaNaplatu?: Number;
  ruza?: Number;
  nama?: Number;
  otkazano?: Boolean;
  gost?: string;
  telefon?: string;
  rezervacija?: string;
  struja?: string;
  voda?: string;
  kucniSavet?: string;
  investicija?: string;
  porez?: string;
  _id?: string;
};

export type Table = {
  _id: string;
  tableName: string;
  values: Rows[];
};

export type UserType = {
  username: string;
  password: string;
  _id: string;
};

export type RowsTrosak = {
  entitet: string;
  predmet: string;
  maj?: string;
  jun?: string;
  jul?: Number;
  avgust?: Number;
  septembar?: Number;
  oktobar?: Number;
  novembar?: Number;
  decembar?: Number;
  ukupnoZaGod?: Boolean;
  ukupnoEu?: string;
  prodato?: string;
  zaradjeno?: string;
  ostaje?: string;
  _id?: string;
};

export type TableTrosak = {
  _id: string;
  tableName: string;
  values: RowsTrosak[];
};
