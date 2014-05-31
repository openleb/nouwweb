.. nouwweb documentation master file, created by
   sphinx-quickstart on Wed Apr  9 03:51:34 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Lebanese Parliament API (nouwweb)
===================================

About
=====
This is an API to query information about Lebanese members of parliament. The current data reflects the 2009 Parliament.
The project is a joint effort by SMEX and Lamba Labs.

Important links:

* Repository:    https://github.com/openleb/nouwweb
* Issues:        https://github.com/openleb/nouwweb/issues
* Documentation: http://nouwweb.rtfd.org/

Usage
=====

The API is very simple to use and follows REST parameter conventions. A request to the API will return a JSON list of results according to the URL param string. 

Users can either get a list of values such as the list of districts at the endpoint ``/districts``, or search for a subset of members of parliament using the endpoint ``/search``. 

For example, here's the list of legislators that have a mobile phone in the district *Beirut I*

.. code-block:: none

	curl 'http://api.nouwweb.pw/search?mobile=true&district=Beirut%20I&prettyprint=true'

API details:

.. toctree::
	:maxdepth: 2

	usage/search
	usage/lists


Contributing
=============
To contribute, fork the [github repo](http://github.com/openleb/nouwweb) or [raise an issue](http://github.com/openleb/issues). 
You can also suggest changes on our mailing list [here](https://groups.google.com/forum/#!forum/openleb)

Authors
=======

* Marc Farra [kamicut](http://github.com/kamicut)
* Maya Kreidieh [acrylc](http://github.com/acrylc)
* Jessica Dheere [jessdheere](http://github.com/jessdheere)
* Mohamad Najem [MoNajem](https://twitter.com/Monajem)
* Joey Ayoub [joeyayoub](https://twitter.com/joeyayoub)

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

