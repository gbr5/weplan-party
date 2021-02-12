export default interface IAppointmentReminderDTO {
  id: string;
  appointment_id: string;
  date: Date;
  reminder_type: string;
}
