import {State, ContentPlayback} from '../States.js';

/*
 * This class contains logic for all ads, be they prerolls, midrolls, or postrolls.
 * Primarily, this involves handling startLinearAdMode and endLinearAdMode.
 * It also handles content resuming.
 */
export default class AdState extends State {

  constructor(player) {
    super(player);
    this.contentResuming = false;
  }

  isAdState() {
    return true;
  }

  /*
   * We end the content-resuming process on the playing event because this is the exact
   * moment that ad playback is no longer blocked by ads.
   */
  onPlaying() {
    if (this.contentResuming) {
      this.transitionTo(ContentPlayback);
    }
  }

  /*
   * If the integration does not result in a playing event when resuming content after an
   * ad, they should instead trigger a contentresumed event to signal that content should
   * resume. The main use case for this is when ads are stitched into the content video.
   */
  onContentResumed() {
    if (this.contentResuming) {
      this.transitionTo(ContentPlayback);
    }
  }

  isContentResuming() {
    return this.contentResuming;
  }

  inAdBreak() {
    return this.player.ads._inLinearAdMode;
  }

}
