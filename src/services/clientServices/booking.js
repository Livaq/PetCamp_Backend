const db = require('../../dbConnect');

const ADD_BOOKING_QUERY =
  'INSERT INTO "booking" ("user", pet, camp, booking_start, booking_end, is_active, room) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const RECEIVE_BOOKING_QUERY = `select B.id, P.name, B.booking_start, B.booking_end, B.is_active, camp.type, P.type as pet_type, R.video
  from booking as B
  join camp ON camp.id = B.camp
  join pet as P ON P.id = B.pet
  join room as R ON R.id = B.room
  where P.owner = $1 and B.is_deleted = false
  order by B.booking_start DESC, B.booking_end ASC, is_active desc`;
const DELETE_BOOKING_QUERY =
  'update booking set is_deleted = true and is_active = false where booking.id = $1';

module.exports = {
  async postBooking(bookingRequest) {
    try {
      const { user, pets, camp, bookingStart, bookingEnd, isActive, rooms } =
        bookingRequest;
      await Promise.all(
        pets.map((pet, index) =>
          db.query(ADD_BOOKING_QUERY, [
            user,
            pet.id,
            camp,
            bookingStart,
            bookingEnd,
            isActive,
            rooms[index].id,
          ])
        )
      );
      return true;
    } catch (error) {
      throw Error('error in posting bookings');
    }
  },

  async receiveUserBooking(booking) {
    try {
      const { id } = booking;
      const bookings = (await db.query(RECEIVE_BOOKING_QUERY, [id])).rows;
      return bookings;
    } catch (error) {
      throw Error('error in receiving bookings');
    }
  },

  async deleteBooking(id) {
    try {
      const bookings = (await db.query(DELETE_BOOKING_QUERY, [id])).rows;
      return bookings;
    } catch (error) {
      throw Error('error when delete booking');
    }
  },

  async disableBooking(id) {
    try {
      await db.query('update booking set want_disable = true where id = $1', [
        id,
      ]);
      return true;
    } catch (error) {
      throw Error('error when disable booking');
    }
  },
};
