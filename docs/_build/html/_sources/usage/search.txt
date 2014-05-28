Search
===========

The ``/search`` endpoint is the main access to the API and allows the user to find information about the current members of parliament. There are multiple paramaters that can be added to the URL to filter and group the results of a query. 

To add a parameter it should be in the form:

.. code-block:: none

	&key=value

If a value contains a space it should be `properly encoded <https://en.wikipedia.org/wiki/Percent-encoding>`_. As an example, here's the endpoint for all the legislators in ``Beirut I`` that have a mobile phone.

.. code-block:: none

	/search?mobile=true&district=Beirut%20I

.. note::

	In some parameters such as ``district`` and ``parties``, the value of the parameter has to correspond to an existing value from a list we provide at a different API endpoint such as ``/districts`` and ``/parties``.

district
---------
The district that the member of parliament represents. The name should be one that appears at the API endpoint ``/districts``

.. code-block:: none
	
	# List legislators that represent the district of Metn
	&district=Metn

deputies_terms
------------------
The terms in parliament in which the legislator has been elected.

.. code-block:: none
	
	# List legislators that were in the 1992 parliament
	&deputies_term=1992

party
---------
The legislators that belong to a certain political party. The name should be one that appears at the API endpoint ``/parties``

.. code-block:: none
	
	# List legislators that are part of the Zahle Bloc
	&party=Zahle%20Bloc

sect
---------
The legislators that belong to a certain sect. The name should be one that appears at the API endpoint ``/sects``

.. code-block:: none
	
	# List legislators that are Maronite
	&sect=Maronite

gender
---------
Can be either ``Female`` or ``Male``.

.. code-block:: none
	
	# List female legislators
	&gender=Female

mobile
---------
Can be either ``true`` or ``false``. Lists representatives for which we have a mobile number.

.. code-block:: none
	
	# List legislators for which we know the mobile phone
	&mobile=true

phone
---------
Can be either ``true`` or ``false``. Lists representatives for which we have a landline number.

.. code-block:: none
	
	# List legislators for which we know the landline phone
	&phone=true

fax
---------
Can be either ``true`` or ``false``. Lists representatives for which we have a fax number.

.. code-block:: none
	
	# List legislators for which we know the fax number
	&fax=true

twitter
---------
Can be either ``true`` or ``false``. Lists representatives that have a twitter account.

.. code-block:: none
	
	# List legislators that have a twitter account
	&twitter=true

facebook
---------
Can be either ``true`` or ``false``. Lists representatives that have a facebook account.

.. code-block:: none
	
	# List legislators that have a facebook account
	&facebook=true

email
---------
Can be either ``true`` or ``false``. Lists representatives that have an email account.

.. code-block:: none
	
	# List legislators that have a an email account
	&email=true

prettyprint
------------------
Can be either ``true`` or ``false``. Indents the response for pretty printing. 

