export default function() {
    this.transition(
        this.fromRoute('application'),
        this.toRoute('robot'),
        this.use('toUp'),
        this.reverse('toDown')
    );

    this.transition(
        this.fromRoute('application'),
        this.toRoute('human'),
        this.use('toRight'),
        this.reverse('toLeft')
    );
}
