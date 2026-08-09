/**
 * Fixed ambient depth layers behind the whole page: drifting nebulae, film
 * grain, scanlines, vignette. All CSS — no canvas, no rAF loop, so it costs
 * nothing on the main thread. Every layer is pointer-events:none.
 */
export default function AmbientField() {
  return (
    <div aria-hidden="true">
      <div className="v-nebula v-nebula--1" />
      <div className="v-nebula v-nebula--2" />
      <div className="v-nebula v-nebula--3" />
      <div className="v-vignette" />
      <div className="v-grain" />
      <div className="v-scanlines" />
    </div>
  )
}
