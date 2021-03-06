import warnOnce from './warn-once';
import Warning  from './warning';

export default class Result {
    constructor(processor, root, opts) {
        this.processor = processor;
        this.messages  = [];
        this.root      = root;
        this.opts      = opts;
        this.css       = undefined;
        this.map       = undefined;
    }

    toString() {
        return this.css;
    }

    warn(text, opts = { }) {
        if ( !opts.plugin ) {
            if ( this.lastPlugin && this.lastPlugin.postcssPlugin ) {
                opts.plugin = this.lastPlugin.postcssPlugin;
            }
        }

        this.messages.push(new Warning(text, opts));
    }

    warnings() {
        return this.messages.filter( i => i.type === 'warning' );
    }

    get from() {
        warnOnce('result.from is deprecated and will be removed in 5.0. ' +
                 'Use result.opts.from instead.');
        return this.opts.from;
    }

    get to() {
        warnOnce('result.to is deprecated and will be removed in 5.0. ' +
                 'Use result.opts.to instead.');
        return this.opts.to;
    }

}
