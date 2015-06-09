if (typeof Promise === "undefined") {
(function () {
	function Promise(resolver) {
		var
		self = this,
		then = self.then = function () {
			return Promise.prototype.then.apply(self, arguments);
		};

		then.fulfilled = [];
		then.rejected = [];

		function timeout(state, object) {
			then.state = 'pending';

			if (then[state].length) setTimeout(function () {
				timeout(state, then.value = then[state].shift().call(self, object));
			}, 0);
			else then.state = state;
		}

		then.fulfill = function (object) {
			timeout('fulfilled', object);
		};

		then.reject = function (object) {
			timeout('rejected', object);
		};

		resolver.call(self, then.fulfill, then.reject);

		return self;
	}

	Promise.prototype = {
		'constructor': Promise,
		'then': function (onFulfilled, onRejected) {
			if (onFulfilled) this.then.fulfilled.push(onFulfilled);
			if (onRejected) this.then.rejected.push(onRejected);

			if (this.then.state === 'fulfilled') this.then.fulfill(this.then.value);

			return this;
		},
		'catch': function (onRejected) {
			if (onRejected) this.then.rejected.push(onRejected);

			return this;
		}
	};

	Promise.all = function () {
		var
		args = Array.prototype.slice.call(arguments),
		countdown = args.length;

		function process(promise, fulfill, reject) {
			promise.then(function onfulfilled(value) {
				if (promise.then.fulfilled.length > 1) promise.then(onfulfilled);
				else if (!--countdown) fulfill(value);

				return value;
			}, function (value) {
				reject(value);
			});
		}

		return new Promise(function (fulfill, reject) {
			while (args.length) process(args.shift(), fulfill, reject);
		});
	};

	window.Promise = Promise;
})();

}
if (typeof window.atob === 'undefined' || typeof window.btoa === 'undefined') {
/** @license MIT David Lindquist (http://www.webtoolkit.info/javascript-base64.html), Andrew Dodson (drew81.com) */
(function () {
	var keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', keysRe = new RegExp('[^' + keys + ']');

	// Window.prototype.atob
	Window.prototype.atob = function atob(input) {
		var output = [], buffer, bufferB, chrs, index = 0, indexB, length = input.length;

		if ((length % 4 > 0) || (keysRe.test(input)) || (/=/.test(input) && (/=[^=]/.test(input) || /={3}/.test(input)))) {
			throw new Error('Invalid base64 data');
		}

		while (index < length) {
			for (bufferB = [], indexB = index; index < indexB + 4;) {
				bufferB.push(keys.indexOf(input.charAt(index++)));
			}

			buffer = (bufferB[0] << 18) + (bufferB[1] << 12) + ((bufferB[2] & 63) << 6) + (bufferB[3] & 63);

			chrs = [(buffer & (255 << 16)) >> 16, bufferB[2] === 64 ? -1 : (buffer & (255 << 8)) >> 8, bufferB[3] === 64 ? -1 : buffer & 255];

			for (indexB = 0; indexB < 3; ++indexB) {
				if (chrs[indexB] >= 0 || indexB === 0) {
					output.push(String.fromCharCode(chrs[indexB]));
				}
			}
		}

		return output.join('');
	};

	// Window.prototype.btoa
	Window.prototype.btoa = function btoa(input) {
		var output = [], buffer, chrs, index = 0, length = input.length;

		while (index < length) {
			chrs = [input.charCodeAt(index++), input.charCodeAt(index++), input.charCodeAt(index++)];

			buffer = (chrs[0] << 16) + ((chrs[1] || 0) << 8) + (chrs[2] || 0);

			output.push(
				keys.charAt((buffer & (63 << 18)) >> 18),
				keys.charAt((buffer & (63 << 12)) >> 12),
				keys.charAt(isNaN(chrs[1]) ? 64 : (buffer & (63 << 6)) >> 6),
				keys.charAt(isNaN(chrs[2]) ? 64 : (buffer & 63))
			);
		}

		return output.join('');
	};
})();

}
