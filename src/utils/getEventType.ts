import brlPortuguese from './language/brlPortuguese';

export function getEventType(type: string): string {
  let thisEventType = '';
  if (type === 'Wedding') {
    thisEventType = brlPortuguese.eventTypes.Wedding;
  }
  if (type === 'Sweet_15') {
    thisEventType = brlPortuguese.eventTypes.Sweet_15;
  }
  if (type === 'Sweet_16') {
    thisEventType = brlPortuguese.eventTypes.Sweet_16;
  }
  if (type === 'Prom') {
    thisEventType = brlPortuguese.eventTypes.Prom;
  }
  if (type === 'Corporate') {
    thisEventType = brlPortuguese.eventTypes.Corporate;
  }
  if (type === 'Wedding_Anniversary') {
    thisEventType = brlPortuguese.eventTypes.Wedding_Anniversary;
  }
  if (type === 'Birthday') {
    thisEventType = brlPortuguese.eventTypes.Birthday;
  }
  if (type === 'Others') {
    thisEventType = brlPortuguese.eventTypes.Others;
  }
  if (type === 'Hanukkah') {
    thisEventType = brlPortuguese.eventTypes.Hanukkah;
  }
  if (type === 'New_Year') {
    thisEventType = brlPortuguese.eventTypes.New_Year;
  }
  if (type === 'Christmas') {
    thisEventType = brlPortuguese.eventTypes.Christmas;
  }
  if (type === 'Baptism') {
    thisEventType = brlPortuguese.eventTypes.Baptism;
  }
  if (type === 'Comercial') {
    thisEventType = brlPortuguese.eventTypes.Comercial;
  }
  return thisEventType;
}
