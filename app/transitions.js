export default function () {
  this.transition(
    this.fromRoute('application'),
    this.toRoute('home'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('application'),
    this.toRoute('about'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('home'),
    this.toRoute('about'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('home'),
    this.toRoute('downloads'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('about'),
    this.toRoute('downloads'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('button-area'),
    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(true),
    this.use('fade'),
    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('fade')
  );
}
